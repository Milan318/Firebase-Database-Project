import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodo, getTodo, updateTodo } from '../features/todos/thunk';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { todo, loading, error } = useSelector((state) => state.todo);

  const [form, setForm] = useState({ title: '', description: '', dueDate: '', status: 'pending' });
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (edit) {
      dispatch(updateTodo({ ...edit, ...form }));
      setEdit(null);
    } else {
      dispatch(createTodo({ ...form, status: 'pending' }));
    }

    setForm({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  const handleEdit = (item) => {
    setEdit(item);
    setForm({
      title: item.title,
      description: item.description || '',
      dueDate: item.dueDate || '',
      status: item.status || 'pending',
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleStatusToggle = (item) => {
    const updated = { ...item, status: item.status === 'pending' ? 'complete' : 'pending' };
    dispatch(updateTodo(updated));
  };

  // Sort by due date (soonest first)
  const sortedTodos = [...todo].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Highlight overdue
  const isOverdue = (dueDate, status) => {
    return dueDate && status !== 'complete' && new Date(dueDate) < new Date();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient p-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #5c45d3, #6c63ff)' }}>
              <h3 className="fw-bold text-black mb-1">📝 Your Todo List</h3>
              <small>Manage tasks with ease using Firebase + Redux Toolkit</small>
            </div>

            {/* Form */}
            <div className="bg-light p-4 border-bottom">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-5">
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Task title"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Short description"
                  ></textarea>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-success px-4">
                    {edit ? '✅ Update Task' : '➕ Add Task'}
                  </button>
                </div>
              </form>
            </div>

            {/* Loader & Error */}
            {loading && <p className="text-center text-muted my-3">⏳ Loading todos...</p>}
            {error && <p className="text-center text-danger my-3">❌ {error}</p>}

            {/* Todo List */}
            <div className="p-4">
              {todo.length === 0 && !loading ? (
                <div className="alert alert-warning text-center">📭 No todos found. Start by adding one!</div>
              ) : (
                sortedTodos.map((item) => (
                  <div
                    key={item.id}
                    className={`border-start border-4 p-3 rounded-3 mb-3 shadow-sm ${
                      item.status === 'complete'
                        ? 'border-success bg-light'
                        : isOverdue(item.dueDate, item.status)
                        ? 'border-danger bg-light'
                        : 'border-primary bg-white'
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="pe-3 w-100">
                        <div className="d-flex align-items-center mb-1">
                          <h5 className={`me-2 mb-0 ${item.status === 'complete' ? 'text-success text-decoration-line-through' : ''}`}>
                            {item.title}
                          </h5>
                          <span className={`badge ${item.status === 'complete' ? 'bg-success' : 'bg-secondary'}`}>
                            {item.status}
                          </span>
                          {isOverdue(item.dueDate, item.status) && (
                            <span className="badge bg-danger ms-2">Overdue</span>
                          )}
                        </div>
                        {item.description && (
                          <p className={`mb-1 small ${item.status === 'complete' ? 'text-muted text-decoration-line-through' : ''}`}>
                            {item.description}
                          </p>
                        )}
                        {item.dueDate && (
                          <small className="text-muted d-block">📅 Due: {item.dueDate}</small>
                        )}
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1">
                        <button
                          onClick={() => handleStatusToggle(item)}
                          className={`btn btn-sm ${item.status === 'pending' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                          title="Toggle Status"
                        >
                          <i className={`bi ${item.status === 'pending' ? 'bi-check-circle' : 'bi-arrow-counterclockwise'}`}></i>
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-sm btn-outline-warning"
                          title="Edit Task"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Task"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="text-center text-muted bg-body-tertiary py-3 small border-top">
              ✨ Stay focused. Stay organized. You're doing great!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

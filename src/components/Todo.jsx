import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodo, getTodo, updateTodo } from '../features/todos/thunk'
import 'bootstrap-icons/font/bootstrap-icons.css'


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

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-header text-white text-center" style={{ background: 'linear-gradient(135deg, #6c63ff, #5c45d3)' }}>
          <h3 className="mb-0 text-black">📋 Firebase Todo App with Status</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-6">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                rows="2"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-primary">
                {edit ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>

          {loading && <p className="text-center text-secondary">🔄 Loading todos...</p>}
          {error && <p className="text-center text-danger">❌ {error}</p>}

          {todo.length === 0 && !loading ? (
            <div className="text-center text-muted mt-3">No todos found. Start by adding one!</div>
          ) : (
            <ul className="list-group">
              {todo.map((item) => (
                <li key={item.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="d-flex align-items-center mb-1">
                        <h5 className={`me-2 mb-0 ${item.status === 'complete' ? 'text-decoration-line-through text-success' : ''}`}>
                          {item.title}
                        </h5>
                        <span className={`badge ${item.status === 'complete' ? 'bg-success' : 'bg-secondary'}`}>
                          {item.status}
                        </span>
                      </div>
                      {item.description && (
                        <p className={`mb-1 small ${item.status === 'complete' ? 'text-muted text-decoration-line-through' : ''}`}>
                          {item.description}
                        </p>
                      )}
                      {item.dueDate && (
                        <small className="text-primary d-block">Due: {item.dueDate}</small>
                      )}
                    </div>
                    <div className="my-auto text-end">
                      <button
                        onClick={() => handleStatusToggle(item)}
                        className={`btn btn-sm me-2 ${item.status === 'pending' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                        title="Toggle Status"
                      >
                        <i className={`bi ${item.status === 'pending' ? 'bi-check-circle' : 'bi-arrow-counterclockwise'}`}></i>
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-sm btn-outline-warning me-2"
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card-footer text-center text-muted small">
          Built with ❤️ using React + Firebase + Redux Toolkit
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
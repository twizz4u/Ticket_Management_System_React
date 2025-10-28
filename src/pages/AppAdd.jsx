import React, { useEffect, useState } from "react";

const AppAdd = ({
  ticket = null,
  onTicketCreated = () => {},
  onTicketUpdated = () => {},
  onCancel = () => {},
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "Medium",
    status: "Open",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!ticket) {
      setForm({
        title: "",
        description: "",
        assignee: "",
        priority: "Medium",
        status: "Open",
      });
      return;
    }
    setForm({
      title: ticket.title || "",
      description: ticket.description || "",
      assignee: ticket.assignee || "",
      priority: ticket.priority || "Medium",
      status: ticket.status || "Open",
      id: ticket.id,
    });
  }, [ticket]);

  const isEdit = !!(ticket && ticket.id);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.assignee.trim()) errs.assignee = "Assignee is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const makeId = () => `TCK-${String(Date.now()).slice(-6)}`;

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (isEdit) {
        const updated = {
          id: form.id,
          title: form.title,
          description: form.description,
          assignee: form.assignee,
          priority: form.priority,
          status: form.status,
        };
        onTicketUpdated(updated);
      } else {
        const ticketObj = {
          id: makeId(),
          title: form.title,
          description: form.description,
          assignee: form.assignee,
          priority: form.priority,
          status: form.status,
        };
        onTicketCreated(ticketObj);
        setForm({
          title: "",
          description: "",
          assignee: "",
          priority: "Medium",
          status: "Open",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancel = () => onCancel();

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Ticket" : "Create New Ticket"}
      </h3>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-200"
            placeholder="Short summary"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-200"
            placeholder="Describe the issue in detail"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="assignee"
              className="block text-sm font-medium text-gray-700"
            >
              Assignee
            </label>
            <input
              id="assignee"
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-200"
              placeholder="Assign to"
            />
            {errors.assignee && (
              <p className="text-red-600 text-sm mt-1">{errors.assignee}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-200"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={cancel}
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-70"
          >
            {!isSubmitting
              ? isEdit
                ? "Update"
                : "Create"
              : isEdit
              ? "Updating..."
              : "Creating..."}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppAdd;

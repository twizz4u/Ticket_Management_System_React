import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../component/AppFooter";
import AppAdd from "./AppAdd";
import AppToast from "../component/AppToast";

const STORAGE_KEY = "tms:tickets";

const defaultTickets = [
  {
    id: "TCK-001",
    title: "Login issue",
    status: "Open",
    priority: "High",
    assignee: "Alice",
  },
  {
    id: "TCK-002",
    title: "Error on checkout",
    status: "In Progress",
    priority: "Medium",
    assignee: "Bob",
  },
  {
    id: "TCK-003",
    title: "Feature request: reports",
    status: "Closed",
    priority: "Low",
    assignee: "Carol",
  },
];

const AppDashboard = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [activeView, setActiveView] = useState("dashboard");
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTickets(JSON.parse(raw));
      else setTickets(defaultTickets.slice());
    } catch (err) {
      console.error("Failed to load tickets from localStorage", err);
      setTickets(defaultTickets.slice());
    }
  }, []);

  const saveTickets = (nextTickets) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTickets));
      return true;
    } catch (e) {
      console.error("Failed to save tickets", e);
      showToast("Failed to save changes. Please try again.", "error");
      return false;
    }
  };

  const showToast = (message, type = "success") =>
    setToast({ show: true, message, type });
  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  const counts = useMemo(
    () => ({
      open: tickets.filter((t) => t.status === "Open").length,
      inProgress: tickets.filter((t) => t.status === "In Progress").length,
      closed: tickets.filter((t) => t.status === "Closed").length,
    }),
    [tickets]
  );

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const showDashboard = () => {
    setEditingTicket(null);
    setActiveView("dashboard");
  };
  const showCreate = () => {
    setEditingTicket(null);
    setActiveView("create");
  };

  const handleTicketCreated = (ticket) => {
    const next = [ticket, ...tickets];
    setTickets(next);
    if (saveTickets(next)) showToast("Ticket created successfully");
    setActiveView("dashboard");
  };

  const handleTicketUpdated = (updated) => {
    const idx = tickets.findIndex((t) => t.id === updated.id);
    if (idx !== -1) {
      const next = [...tickets];
      next.splice(idx, 1, updated);
      setTickets(next);
      if (saveTickets(next)) showToast("Ticket updated successfully");
    }
    setActiveView("dashboard");
    setEditingTicket(null);
  };

  const editTicket = (ticket) => {
    setEditingTicket({ ...ticket });
    setActiveView("create");
  };

  const deleteTicket = (id) => {
    if (!window.confirm("Delete this ticket? This cannot be undone.")) return;
    const idx = tickets.findIndex((t) => t.id === id);
    if (idx !== -1) {
      const next = [...tickets];
      next.splice(idx, 1);
      setTickets(next);
      if (saveTickets(next)) showToast("Ticket deleted", "info");
    }
  };

  const handleLogout = () => {
    showToast("You have been logged out.", "info");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-white">
      <AppToast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <header className="flex items-center justify-between px-6 py-4 border-b bg-cyan-50">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="p-2 rounded-md hover:bg-cyan-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-cyan-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {activeView === "dashboard" ? "Dashboard" : "Create Ticket"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={showCreate}
            className="flex items-center gap-2 px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            New Ticket
          </button>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? "w-0 sm:w-64" : "sm:w-0 w-64"
          } transition-all duration-200 bg-cyan-700 text-cyan-50 h-[calc(100vh-64px)] overflow-auto`}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="ml-1 text-lg font-bold">
                  Ticket Management
                </span>
              </div>
              <button
                onClick={toggleSidebar}
                className="md:hidden p-1 rounded hover:bg-cyan-600/30"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-2 text-sm">
                <li
                  onClick={showDashboard}
                  className={`px-2 py-2 rounded cursor-pointer ${
                    activeView === "dashboard"
                      ? "bg-cyan-600/20"
                      : "hover:bg-cyan-600/20"
                  }`}
                >
                  View Tickets
                </li>
                <li
                  onClick={showCreate}
                  className={`px-2 py-2 rounded cursor-pointer ${
                    activeView === "create"
                      ? "bg-cyan-600/20"
                      : "hover:bg-cyan-600/20"
                  }`}
                >
                  Create Ticket
                </li>
              </ul>
            </nav>

            <div className="mt-4 text-xs text-cyan-200">
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 rounded hover:bg-cyan-600/20"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 bg-cyan-50 min-h-[calc(100vh-64px)]">
          {activeView === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-sm text-gray-500">Open Tickets</h3>
                    <p className="text-2xl font-semibold text-gray-800">
                      {counts.open}
                    </p>
                  </div>
                  <div className="bg-cyan-100 p-3 rounded-full text-cyan-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-sm text-gray-500">In Progress</h3>
                    <p className="text-2xl font-semibold text-gray-800">
                      {counts.inProgress}
                    </p>
                  </div>
                  <div class="bg-orange-100 p-3 rounded-full text-orange-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="4" y="10" width="3.5" height="10" rx="0.5" />
                      <rect x="10.25" y="6" width="3.5" height="14" rx="0.5" />
                      <rect x="16.5" y="2" width="3.5" height="18" rx="0.5" />
                    </svg>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-sm text-gray-500">Closed</h3>
                    <p className="text-2xl font-semibold text-gray-800">
                      {counts.closed}
                    </p>
                  </div>
                  <div class="bg-cyan-100 p-3 rounded-full text-cyan-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 8V6a5 5 0 0110 0v2h1a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2V9a1 1 0 011-1h1zm2-2a3 3 0 116 0v2H7V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="w-full flex items-center mb-4">
                <hr class="flex-1 border-cyan-200" />
                <span class="mx-4 text-cyan-700 font-semibold text-lg">
                  Tickets
                </span>
                <hr class="flex-1 border-cyan-200" />
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[48vh]">
                {tickets.map((ticket) => (
                  <article
                    key={ticket.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-500">{ticket.id}</p>
                        <h3 className="mt-1 text-lg font-semibold text-gray-800">
                          {ticket.title}
                        </h3>
                      </div>
                      <div className="ml-4 shrink-0">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                            ticket.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-semibold">
                          {ticket.assignee ? ticket.assignee.charAt(0) : "?"}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Assignee</p>
                          <p className="text-sm font-medium text-gray-800">
                            {ticket.assignee}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Status</p>
                        <p
                          className={`inline-flex items-center px-2 py-1 rounded text-sm font-semibold ${
                            ticket.status === "Open"
                              ? "bg-cyan-100 text-cyan-700"
                              : ticket.status === "In Progress"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {ticket.status}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3">
                      <button
                        onClick={() => editTicket(ticket)}
                        className="text-cyan-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTicket(ticket.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeView === "create" && (
            <AppAdd
              ticket={editingTicket}
              onTicketCreated={handleTicketCreated}
              onTicketUpdated={handleTicketUpdated}
              onCancel={showDashboard}
            />
          )}
        </main>
      </div>

      <footer>
        <AppFooter />
      </footer>
    </section>
  );
};

export default AppDashboard;

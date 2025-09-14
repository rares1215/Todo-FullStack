function Modal({ closeModal, onDelete, task }) {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={() => closeModal(false)}
          className=" pointer absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-4 text-center">
          Confirm Delete Task
        </h1>

        {/* Body */}
        <p className="mb-6 text-gray-600 dark:text-gray-200 text-center">
          Are you sure you want to delete <strong>{task.title}</strong>? This action cannot be undone!
        </p>

        {/* Footer */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => closeModal(false)}
            className=" pointer px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(task.id);
              closeModal(false);
            }}
            className=" pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

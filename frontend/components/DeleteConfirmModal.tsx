export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
     
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}

      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-transparent dark:border-slate-800 max-w-md w-full p-6">
          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="mt-3 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Task
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  &#34;{taskTitle}&#34;
                </span>
                ? This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 bg-red-600 px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

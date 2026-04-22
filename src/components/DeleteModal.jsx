function DeleteModal({ open, label, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-white p-6">
        <h3 className="mb-3 text-xl font-semibold">Delete Item?</h3>
        <p className="mb-6 text-sm text-gray-600">
          You are about to delete <span className="font-semibold text-black">{label}</span>. This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

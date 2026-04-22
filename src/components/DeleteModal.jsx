function DeleteModal({ open, label, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#141414] p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Delete Item?</h3>
        <p className="mb-6 text-sm text-gray-400">
          You are about to delete <span className="font-semibold text-white">{label}</span>. This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-500"
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

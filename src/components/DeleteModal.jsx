function DeleteModal({ open, label, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '32px',
        }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
          Delete Item?
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
          You are about to delete{' '}
          <span style={{ fontWeight: 700, color: '#000' }}>{label}</span>. This action cannot be
          undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              background: '#fff',
              color: '#000',
              border: '1px solid rgba(0,0,0,0.2)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              background: '#000',
              color: '#fff',
              border: '1px solid #000',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

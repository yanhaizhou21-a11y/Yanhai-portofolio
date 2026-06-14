import { motion, AnimatePresence } from 'framer-motion'

function DeleteModal({ open, label, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            padding: '16px',
            fontFamily: 'var(--font-body)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '420px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              padding: '32px',
              transition: 'background 0.4s ease, border-color 0.4s ease',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>
              Delete Item?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              You are about to delete{' '}
              <span style={{ fontWeight: 700, color: 'var(--text)' }}>{label}</span>. This action cannot be
              undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <motion.button
                type="button"
                onClick={onCancel}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="button"
                onClick={onConfirm}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  background: 'var(--text)',
                  color: 'var(--bg)',
                  border: '1px solid var(--text)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeleteModal

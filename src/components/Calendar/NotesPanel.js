'use client';

import { useState, useRef, useEffect } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { formatDateReadable } from '@/utils/dateHelpers';
import styles from './NotesPanel.module.css';

/**
 * Integrated notes panel.
 * Shows notes for the selected date/range with CRUD operations.
 */
export default function NotesPanel({
  notes,
  rangeStart,
  rangeEnd,
  onAdd,
  onDelete,
  onEdit,
}) {
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef(null);
  const editRef = useRef(null);

  const hasSelection = rangeStart !== null;
  const isSingleDate = rangeStart && rangeStart === rangeEnd;
  const isRange = rangeStart && rangeEnd && rangeStart !== rangeEnd;

  // Focus edit input when editing
  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.focus();
    }
  }, [editingId]);

  const getSelectionTitle = () => {
    if (isSingleDate) return formatDateReadable(rangeStart);
    if (isRange) return `${formatDateReadable(rangeStart)} — ${formatDateReadable(rangeEnd)}`;
    if (rangeStart && !rangeEnd) return formatDateReadable(rangeStart);
    return 'This Month';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim() && hasSelection) {
      onAdd(newNote);
      setNewNote('');
      inputRef.current?.focus();
    }
  };

  const handleEditSubmit = (noteId) => {
    if (editText.trim()) {
      onEdit(noteId, editText);
    }
    setEditingId(null);
    setEditText('');
  };

  const startEditing = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={styles.panel} id="notes-panel">
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Notes</h3>
          {hasSelection && (
            <div className={styles.selectionLabel}>{getSelectionTitle()}</div>
          )}
        </div>
        {notes.length > 0 && (
          <span className={styles.noteCount}>{notes.length}</span>
        )}
      </div>

      {/* Notes list */}
      <div className={styles.notesList}>
        {!hasSelection ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <div className={styles.emptyTitle}>Select a date</div>
            <div className={styles.emptyHint}>
              Click on a date or select a range<br />to add notes
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <div className={styles.emptyTitle}>No notes yet</div>
            <div className={styles.emptyHint}>
              Add your first note below
            </div>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              <span className={styles.noteBullet} />
              <div className={styles.noteContent}>
                {editingId === note.id ? (
                  <input
                    ref={editRef}
                    className={styles.editInput}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditSubmit(note.id);
                      if (e.key === 'Escape') {
                        setEditingId(null);
                        setEditText('');
                      }
                    }}
                    onBlur={() => handleEditSubmit(note.id)}
                  />
                ) : (
                  <>
                    <div className={styles.noteText}>{note.text}</div>
                    <div className={styles.noteDate}>
                      {formatTime(note.createdAt)}
                    </div>
                  </>
                )}
              </div>
              <div className={styles.noteActions}>
                {editingId === note.id ? (
                  <>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleEditSubmit(note.id)}
                      aria-label="Save edit"
                    >
                      <FiCheck />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => {
                        setEditingId(null);
                        setEditText('');
                      }}
                      aria-label="Cancel edit"
                    >
                      <FiX />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.actionButton}
                      onClick={() => startEditing(note)}
                      aria-label="Edit note"
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => onDelete(note.id)}
                      aria-label="Delete note"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add note form */}
      {hasSelection && (
        <form className={styles.addForm} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={styles.addInput}
            type="text"
            placeholder={
              rangeEnd
                ? 'Add a note...'
                : 'Select end date first, or add note...'
            }
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            id="note-input"
          />
          <button
            className={styles.addButton}
            type="submit"
            disabled={!newNote.trim()}
            aria-label="Add note"
            id="btn-add-note"
          >
            <FiPlus />
          </button>
        </form>
      )}
    </div>
  );
}

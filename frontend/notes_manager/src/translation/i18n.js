import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallback: 'en',
        resources: {
            en: {
                translation: {
                    title: "Notes",
                    noteCreation: "Create",
                    noteName: "Note Name:",
                    description: "Description:",
                    date: "Date:",
                    submit: "Submit",
                    noteById: "Note by id",
                    getNote: "Get Note",
                    error: "Note not found",
                    noteDetails: "Note Details",
                    updateNote: "Update"
                }
            },
            de: {
                translation: {
                    title: "Notizen",
                    noteCreation: "Erstellen",
                    noteName: "Hinweis Name:",
                    description: "Beschreibung:",
                    date: "Datum:",
                    submit: "Einreichen",
                    noteById: "Anmerkung von id",
                    getNote: "Notiz erhalten",
                    error: "Notiz nicht gefunden",
                    noteDetails: "Details beachten",
                    updateNote: "Aktualisieren"
                }
            }
        }
})


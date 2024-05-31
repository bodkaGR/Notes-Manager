import {NoteList} from "../components/NoteList";
import {GetNoteById} from "../components/GetNoteById";
import {useTranslation, Trans} from "react-i18next";

const lngs = {
    en: {nativeName: 'En'},
    de: {nativeName: 'De'}
}

export const Home = () => {
    const {i18n} = useTranslation()
    return (
        <>
            <div id="leng-buttons">
                {Object.keys(lngs).map((lng) => (
                    <button className="lengBtn"
                        type="submit"
                        key={lng}
                        onClick={() => i18n.changeLanguage(lng)}
                        disabled={i18n.resolvedLanguage === lng}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
              <NoteList />
                <GetNoteById />
        </>
    );
}
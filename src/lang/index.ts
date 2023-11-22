import { createI18n } from "vue-i18n";
import EN from "./en.json"
import CN from "./cn.json"

export default createI18n({
    locale: "en",
    globalInjection: true,
    messages: {
        en: {
            ...EN
        },
        zh: {
            ...CN
        }
    }
})
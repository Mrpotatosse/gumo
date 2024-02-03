import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function _404() {
    const { t } = useTranslation();

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                <div className="text-8xl">404</div>
                <Link to="/" className="w-full flex justify-center">
                    <Button variant="link">{t("app.home")}</Button>
                </Link>
            </div>
        </div>
    );
}

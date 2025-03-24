import notFoundIconSrc from '../../assets/icons/404.png'
import {BaseFallbackComponent} from "../../components/layout/wrapper/boundary/fallback/base";

const NotFoundPage = () => {
    return <BaseFallbackComponent iconSrc={notFoundIconSrc} text="Page not found :("/>
}

export default NotFoundPage
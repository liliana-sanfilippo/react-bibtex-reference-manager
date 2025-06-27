import { goTo } from "./scrollTo";


interface SupScrollLinkProps {
    label: string;
}


export const SupScrollLink : React.FC<SupScrollLinkProps> = ({label }) => {
    let targetId = "desc-" + label
    const handleClick = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            goTo(targetElement);
        }
    };

    return (
        <sup><a onClick={handleClick}>
            {label}
        </a>
        </sup>
    );
};
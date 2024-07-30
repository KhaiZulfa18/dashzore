import React from 'react'

const Card = ({className = '', children}) => {
    return (
        <div className={`card overflow-x-auto bg-gray-100 shadow-xl ` + className}>
            <div className="card-body py-4 md:py-6 px-4 md:px-8">
                {children}
            </div>
        </div>
    );
}

const CardHeader = ({className = '', children}) => {
    return (
        <div className={`flex items-center `+ className}>
            {children}
        </div>
    );
}

const CardBody = ({ className = '', children }) => {
    return (
        <div className={`text-gray-800 dark:text-gray-200` + className}>
            {children}
        </div>
    );
};

const CardFooter = ({ className = '', children }) => {
    return (
        <div className={`pt-2 text-sm ` + className}>
            {children}
        </div>
    );
};


Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
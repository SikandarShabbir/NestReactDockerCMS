import React, {useState} from 'react';

const Paginator = (props: { lastPage: number, page: number, pageChanged: (page: number) => void }) => {

    const previous = () => {
        if (props.page > 1) {
            props.pageChanged(props.page - 1);
        }
    }
    const next = () => {
        if (props.page < props.lastPage) {
            props.pageChanged(props.page + 1);
        }
    }
    return (
        <div>
            <nav aria-label="Page navigation example text-center">
                <ul className="pagination text-center">
                    <li className="page-item"><a className="page-link" onClick={previous} href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" onClick={next} href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Paginator;
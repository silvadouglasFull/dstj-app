/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ history, children }) => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return <>{children}</>;
}

export default withRouter(ScrollToTop);
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCores } from 'selectors/core';
import ModalContainer from "../common/ModalContainer";
import usePopupCss from './hooks/usePopupCss';
import useHeaderScroll from './hooks/useHeaderScroll';
import useCartLoader from './hooks/useCartLoader';
import useViewedProduct from './hooks/useViewedProduct';

interface ICoreProps {
}

const Core: React.FunctionComponent<ICoreProps> = ({

}) => {
    const { visible } = useSelector(selectCores());

    usePopupCss();
    useHeaderScroll();
    useCartLoader();
    useViewedProduct();

    return (
        <>
            {visible ? <ModalContainer /> : ''}
        </>
    );
};

export default Core;
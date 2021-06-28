import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import wrapper from 'store';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { loadUser } from 'thunks';
import { deleteCategory, deleteProduct } from 'thunks/products';
import useInputs from 'lib/hooks/useInputs';
import LabelInput from 'components/common/LabelInput';
import Button from 'components/common/Button';

const DeleteForm = () => {

    const dispatch = useDispatch();
    const [value, onChange] = useInputs({
        id: '',
        categoryId: '',
    })
    const { id, categoryId } = value;

    const onDeleteProduct = (e) => dispatch(deleteProduct(id))
    const onDeleteCategory = (e) => dispatch(deleteCategory(categoryId))

    return (
        <div className="delete-form__container">
            <form onSubmit={onDeleteProduct}>
                <LabelInput
                    label="id"
                    name="id"
                    value={id}
                    placeholder="상품 번호"
                    onChange={onChange}
                    type="text"
                />
                <Button type="submit">
                    삭제
                </Button>
            </form>
            <form onSubmit={onDeleteCategory}>
                <LabelInput
                    label="categoryId"
                    name="categoryId"
                    value={categoryId}
                    placeholder="카테고리 번호"
                    onChange={onChange}
                    type="text"
                />
                <Button type="submit">
                    삭제
                </Button>
            </form>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
    const state = await context.store.getState();
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.users.me) await context.store.dispatch(loadUser());

    return {
        props: {
            pathname: "/DeleteForm",
        }
    };
}
);

export default connect(state => state)(DeleteForm);
import React from "react";
import styled from "styled-components";
import { ADD_TODO } from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const AddTodo = () => {
  let input;
  // useMutation사용
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
      </form>
    </div>
  );
};

export default AddTodo;

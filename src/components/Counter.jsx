import React, { useContext } from 'react';
import { StyledWidget as Div } from '../styled';
import countContext from '../contexts/countContext';

function Output({ count }) {
  // we are not soiling a good enough component
  // with any context syntax
  return (
    <Div color='red'>
      UsesContextConsumer, <span className='bold'>{count.number}</span>
    </Div>
  );
}

// METHOD A works with both class & functional components
// 1- import context at the top
// 2- use the countContext.Consumer in the jsx
// 3- inside the consumer, put a function of "context" that
//         returns the desired jsx
// 4- use the context inside the jsx, instead of props!!!
class UsesContextConsumer extends React.Component {
  render() {
    return (
      <countContext.Consumer>
        {
          (count) => (
            // count is what we fed into the 'value' prop in the top component
            <Output count={count} />
          )
        }
      </countContext.Consumer>
    );
  }
}

// METHOD B only works with classes because the this keyword is used
// step 1 - import countContext at the top
// step 2 - add a static property to the class with the countContext
// step 3 - consume the context through this.context
class UsesStaticContextType extends React.Component {
  static contextType = countContext // not "real" JS

  render() {
    return (
      <Div color='blue'>
        <button onClick={this.context.increment}>INCREMENT MUAHAHA</button>
        UsesStaticContextType, <span className='bold'>{this.context.number}</span>
      </Div>
    );
  }
}
// UsesStaticContextType.contextType = countContext;

// METHOD C
// step 1 import the countContext at the top
// step 2 import the context hook useContext from react at the top
// step 3 use the hook!
function FunctionUsingContextHook() {
  const count = useContext(countContext); // dirty!!
  return (
    <Div color='green'>
      FunctionUsingContextHook, <span className='bold'>{count.number}</span>
    </Div>
  );
}

export default function Counter() {
  return (
    <Div color='yellow'>
      <div>This is the <span className='bold'>CounterIntermediate</span> component.</div>
      <div>
        It does not use the `count` object itself, but
        it renders three components that will use the
        context API in different ways, to get the `count` object
        straight from the top of the app
      </div>

      <UsesContextConsumer />
      <UsesStaticContextType />
      <FunctionUsingContextHook />
    </Div>
  );
}

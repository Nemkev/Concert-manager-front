import React, { useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You click counter is {count} </p>
      <button onClick={() => setCount(count + 1)}>Click on me</button>
    </div>
  );
}

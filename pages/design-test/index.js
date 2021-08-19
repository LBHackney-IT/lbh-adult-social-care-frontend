import React from 'react';

import { Input } from '../../components/HackneyDS';

export default function DesignTestPage() {
  return (
    <div>
      <h1 style={{ fontSize: '30px', fontWeight: '700' }}>Inputs</h1>
      <div style={{ width: '600px' }}>
        <Input label="Label Example" />
        <Input label="Label Example" hint="With hint text" />
        <Input label="Error Example" hint="With hint text" error="Error message goes here" />
      </div>
    </div>
  );
}

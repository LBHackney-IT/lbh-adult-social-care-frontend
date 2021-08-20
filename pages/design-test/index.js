import React, { useState } from 'react';

import { Input, Button, Radio, Fieldset } from '../../components/HackneyDS';

export default function DesignTestPage() {
  // State
  const [inputValues, setInputValues] = useState({ default: 'null', hinted: 'null', error: 'null' });
  const [checkedRadio, setCheckedRadio] = useState(null);

  // Handlers
  const inputHandler = (value, target) => {
    setInputValues({ ...inputValues, [target]: value });
  };
  const radioHandler = (value, target) => value && setCheckedRadio(target);

  // Markup
  const Inputs = (
    <div style={{ margin: '30px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '700' }}>Inputs</h1>
      <div>
        <div style={{ display: 'flex' }}>
          <Input handler={(e) => inputHandler(e, 'default')} value={inputValues.default}>
            Default
          </Input>
          <span style={{ alignSelf: 'flex-end', marginBottom: '30px' }}>{inputValues.default}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <Input handler={(e) => inputHandler(e, 'hinted')} value={inputValues.hinted}>
            Label Example
            <span className="govuk-hint lbh-hint">With hint text</span>
          </Input>
          <span style={{ alignSelf: 'flex-end', marginBottom: '30px' }}>{inputValues.hinted}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <Input error="Error message goes here" handler={(e) => inputHandler(e, 'error')} value={inputValues.error}>
            Error Example
            <span className="govuk-hint lbh-hint">With hint text</span>
          </Input>
          <span style={{ alignSelf: 'flex-end', marginBottom: '30px' }}>{inputValues.error}</span>
        </div>
      </div>
    </div>
  );

  const Buttons = (
    <div style={{ margin: '30px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '700' }}>Buttons</h1>
      <div>
        <Button>Save and continue</Button>
      </div>
      <div>
        <Button secondary>Secondary button</Button>
      </div>
      <div>
        <Button disabled>Disabled button</Button>
      </div>
      <div>
        <Button link="/design-test">Link button</Button>
      </div>
      <div>
        <Button link="/design-test" disabled>
          Disabled link button
        </Button>
      </div>
      <div>
        <Button add-item>Add another item</Button>
      </div>
    </div>
  );

  const Radios = (
    <div style={{ margin: '30px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '700' }}>Radios</h1>
      {'' + checkedRadio}
      <Fieldset>
        <Radio checked={checkedRadio === 'default'} value="default" handler={radioHandler}>
          Default
        </Radio>
        <Radio inline checked={checkedRadio === 'inline'} value="inline" handler={radioHandler}>
          Inline
        </Radio>
        <Radio disabled checked={checkedRadio === 'disabled'} value="disabled" handler={radioHandler}>
          Disabled
        </Radio>
        <Radio checked={checkedRadio === 'legend'} value="legend" handler={radioHandler}>
          <span className="govuk-heading-s govuk-!-margin-bottom-1">Legend</span>
          Legend Description
        </Radio>
      </Fieldset>

      <Fieldset error="Please select an options">
        <legend className="govuk-fieldset__legend">Have you changed your name?</legend>
        <span className="govuk-hint lbh-hint">
          This includes changing your last name or spelling your name differently.
        </span>
        <Radio checked={checkedRadio === 'error'} value="error" handler={radioHandler}>
          Error
        </Radio>
      </Fieldset>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      {Inputs}
      {Buttons}
      {Radios}
    </div>
  );
}

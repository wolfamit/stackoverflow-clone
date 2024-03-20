import React from 'react'
import './Rightside.css'
import WidgetTags from './WidgetTags';
import Widget from './Widget';

const Rightside = () => {
  return (
    <aside className="right-sidebar">
      <Widget />
      <WidgetTags />
    </aside>
  );
};

export default Rightside
const MenuItems = (props) => (
  <nav>
    <ul>
      {props.items.map(item => (
        <li key={item.title}>
          <a href={item.href}>{item.title}</a>
        </li>
      ))}
    </ul>
  </nav>
);


const Menu = (props) => {
  const {
    items,
    opened = null
  } = props;

  return (
    <div className={`menu ${opened ? 'menu-open' : ''}`}>
      <div className="menu-toggle"><span></span></div>
      {opened && (<MenuItems items={items} />)}
    </div>
  )
};

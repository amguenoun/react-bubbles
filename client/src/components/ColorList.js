import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, handleFlag }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        handleFlag();
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch(err => console.log('Error: ColorList: PUT: ', err));
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(() => {
        handleFlag();
        setEditing(false);
      })
      .catch(err => console.log('Error: ColorList: DELETE: ', err))

  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth().post('/api/colors', { ...newColor, id: Date.now() })
      .then(() => {
        handleFlag();
        setNewColor(initialColor);
      })
      .catch(err => console.log('Error: ColorList: POST: ', err))
  }

  const resetNewColor = e => {
    e.preventDefault();
    setNewColor(initialColor);

  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input value={newColor.color} onChange={(e) => setNewColor({ ...newColor, color: e.target.value })} />
        </label>
        <label>
          hex code:
          <input value={newColor.code.hex} onChange={(e) => setNewColor({ ...newColor, code: { hex: e.target.value } })} />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
          <button onClick={resetNewColor}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;

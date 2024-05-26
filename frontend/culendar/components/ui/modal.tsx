const Modal = () => {
  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" />
      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" />
      <button type="submit">Submit</button>
    </form>
  );
};
export default Modal;

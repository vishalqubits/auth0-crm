/**function defined for handling form error message
 * @returns Error message
 */
function TextError(props: any) {
  return (
    <div
      data-testid="error"
      className="text-[#FF0000] text-c-tiny md:text-c-xl not-italic font-normal px-2 md:px-4"
    >
      {props.children}
    </div>
  );
}

export default TextError;

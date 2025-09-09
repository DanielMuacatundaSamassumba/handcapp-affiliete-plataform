import Swal from "sweetalert2";
export interface AlertProps {
  text: string;
  title: string;
  icon: "success" | "error" | "warning" | "info" | "question";
}
export function Alert(props: AlertProps) {
  const { text, title, icon } = props
  return Swal.fire({
    title: title,
    text: text,
    icon: icon
  });
}
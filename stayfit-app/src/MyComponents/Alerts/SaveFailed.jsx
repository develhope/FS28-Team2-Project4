import Swal from "sweetalert2";

export const SaveFailed = () => {
  Swal.fire({
    title: 'Errore!',
    text: 'Si è verificato un errore durante il salvataggio.',
    icon: 'error',
    confirmButtonText: 'Riprova',
    confirmButtonColor: 'red',
    background: '#01282F',
    color: '#fff'
  });
};

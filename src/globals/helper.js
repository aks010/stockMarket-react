import { useCallback } from "react/cjs/react.production.min";

export const RenderMessage = (status, message, callback) => {
  if (status == 200 || status == 201 || status == 204) {
    return (
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        {message ? message : "Successfully Created."}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={callback}
        ></button>
      </div>
    );
  } else if (status == 400) {
    return (
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {message ? message : "Bad Request"}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={callback}
        ></button>
      </div>
    );
  } else {
    return (
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        {message ? message : "Something went wrong!"}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={callback}
        ></button>
      </div>
    );
  }
};

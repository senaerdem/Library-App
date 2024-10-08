export const validateBook = (book) => {
    if (!book.title || !book.author) {
      return false;
    }
    return true;
  };
  
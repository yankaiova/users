export async function fetchUsers(url) {
  try {
    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Неверный запрос (400). Проверьте параметры.", 400);
        case 401:
          throw new Error(
            "Неавторизован (401). Требуется вход в систему.",
            401
          );
        case 403:
          throw new AError("Доступ запрещён (403).", 403);
        case 404:
          throw new Error("Данные не найдены (404).", 404);
        case 500:
          throw new Error("Ошибка сервера (500). Попробуйте позже.", 500);
        default:
          throw new Error(
            `Ошибка сервера: ${response.status} ${response.statusText}`,
            response.status
          );
      }
    }
    const data = await response.json();
    return { users: data.users, total: data.total };
  } catch (e) {
    throw error;
  }
}

export const fetchEmployees = async () => {
    const response = await fetch(
        "https://backend.jotish.in/backend_dev/gettabledata.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "test",
                password: "123456",
            }),
        }
    );

    const result = await response.json();

    const formatted = result.TABLE_DATA.data.map((row, index) => ({
        id: index,
        name: row[0],
        position: row[1],
        city: row[2],
        office: row[3],
        startDate: row[4],
        salary: row[5],
    }));

    return formatted;
};
import qrcode
import psycopg2

# Configuration de la base de données
DB_CONFIG = {
    'dbname': 'RH-DB',
    'user': 'postgres',
    'password': 'root',
    'host': 'localhost',
    'port': 5432
}

# Fonction pour récupérer les informations des employés
def fetch_employees():
    try:
        # Connexion à la base de données
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # Requête pour récupérer les informations essentielles
        query = """
        SELECT 
            id, 
            first_name, 
            last_name, 
            email, 
            department_id, 
            position_id
        FROM employees;
        """
        cursor.execute(query)
        employees = cursor.fetchall()

        # Fermeture de la connexion
        cursor.close()
        conn.close()
        return employees
    except Exception as e:
        print("Erreur lors de la récupération des employés :", e)
        return []

# Fonction pour générer les QR codes
def generate_qr_codes(employees):
    for employee in employees:
        emp_id, first_name, last_name, email, department_id, position_id = employee

        # Créer un contenu pour le QR code
        qr_content = {
            'id': emp_id,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'department_id': department_id,
            'position_id': position_id
        }

        # Générer le QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_content)
        qr.make(fit=True)

        # Créer l'image du QR code
        img = qr.make_image(fill_color="black", back_color="white")

        # Enregistrer l'image avec un nom basé sur l'ID ou le nom
        filename = f"qr_codes/{emp_id}_{first_name}_{last_name}.png"
        img.save(filename)
        print(f"QR Code généré : {filename}")

if __name__ == "__main__":
    # Créer un dossier pour les QR codes si nécessaire
    import os
    os.makedirs("qr_codes", exist_ok=True)

    # Récupérer les employés et générer les QR codes
    employees = fetch_employees()
    if employees:
        generate_qr_codes(employees)
    else:
        print("Aucun employé trouvé.")

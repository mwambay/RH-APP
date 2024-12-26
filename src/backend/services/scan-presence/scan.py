from datetime import datetime
import qrcode
import psycopg2
DB_CONFIG = {
    'dbname': 'RH-DB',
    'user': 'postgres',
    'password': 'root',
    'host': 'localhost',
    'port': 5432
}
def enregistrer_arrivee(employee_id):
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # Vérifier si une présence existe déjà pour aujourd'hui
        query_check = """
        SELECT id FROM presences 
        WHERE employee_id = %s AND DATE(arrival_time) = CURRENT_DATE;
        """
        cursor.execute(query_check, (employee_id,))
        result = cursor.fetchone()

        if result:
            print(f"L'arrivée pour l'employé {employee_id} a déjà été enregistrée aujourd'hui.")
            return None  # Retourner l'ID de la présence existante

        # Insérer une nouvelle ligne pour l'arrivée
        query_insert = """
        INSERT INTO presences (employee_id, arrival_time, status)
        VALUES (%s, %s, %s)
        RETURNING id;
        """
        arrival_time = datetime.now()
        status = "present"
        cursor.execute(query_insert, (employee_id, arrival_time, status))
        presence_id = cursor.fetchone()[0]
        conn.commit()

        print(f"Arrivée enregistrée avec succès, ID : {presence_id}")
        return presence_id

    except Exception as e:
        print("Erreur lors de l'enregistrement de l'arrivée :", e)
    finally:
        if conn:
            cursor.close()
            conn.close()

def enregistrer_depart(employee_id):
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # Vérifier si une présence existe déjà pour aujourd'hui
        query_check = """
        SELECT id FROM presences 
        WHERE employee_id = %s AND DATE(arrival_time) = CURRENT_DATE AND departure_time IS NULL;
        """
        cursor.execute(query_check, (employee_id,))
        result = cursor.fetchone()

        if not result:
            print(f"Aucune arrivée trouvée pour l'employé {employee_id} aujourd'hui ou départ déjà enregistré.")
            return None  # Retourner None si aucune arrivée n'est enregistrée

        # Mettre à jour l'heure de départ
        query_update = """
        UPDATE presences
        SET departure_time = %s
        WHERE id = %s;
        """
        departure_time = datetime.now()
        cursor.execute(query_update, (departure_time, result[0]))
        conn.commit()

        print(f"Départ enregistré avec succès pour l'employé {employee_id}.")
        return result[0]

    except Exception as e:
        print("Erreur lors de l'enregistrement du départ :", e)
    finally:
        if conn:
            cursor.close()
            conn.close()

def gerer_scan(employee_id):
    # Vérifier s'il y a déjà une présence enregistrée pour cet employé aujourd'hui
    presence_id = enregistrer_arrivee(employee_id)  # Tentative d'enregistrement d'une arrivée

    if presence_id is None:
        # Si l'employé a déjà scanné pour l'arrivée, tenter d'enregistrer le départ
        enregistrer_depart(employee_id)
    else:
        print(f"L'arrivée a été enregistrée pour l'employé {employee_id}.")


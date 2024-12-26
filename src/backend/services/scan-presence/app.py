import cv2
from pyzbar.pyzbar import decode
import requests
import time
import json
from scan import gerer_scan
import ast

# URL du serveur principal pour envoyer les données
SERVER_URL = "http://localhost:3000/presence/scan"

def scan_qr_code():
    # Ouvrir la webcam
    cap = cv2.VideoCapture(0)
    print("Appuyez sur 'q' pour quitter.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Erreur : impossible d'accéder à la caméra.")
            break

        # Décoder les QR codes dans le flux vidéo
        codes = decode(frame)
        for code in codes:
            data = code.data.decode('utf-8')
            print(f"QR Code détecté")

            try:
                # Convertir la chaîne de caractères en dictionnaire
                donnees = ast.literal_eval(data)
                gerer_scan(donnees['id'])
                time.sleep(1)
                #send_to_server(donnees)
            except :
                print("Erreur de décodage")


            #gerer_scan(int(data[1]))
            continue
            # Envoyer les données au serveur
            send_to_server(data)

        # Afficher le flux vidéo
        cv2.imshow("Scanner QR Code", frame)

        # Quitter avec 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def send_to_server(qr_data):
    try:
        payload = {
            "employee_id": qr_data,
            "timestamp": "2024-12-26T12:00:00"  # Exemples, tu peux automatiser ça
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(SERVER_URL, data=json.dumps(payload), headers=headers)

        if response.status_code == 200:
            print("Données envoyées avec succès !")
        else:
            print(f"Erreur : {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Erreur lors de l'envoi des données : {e}")

if __name__ == "__main__":
    scan_qr_code()

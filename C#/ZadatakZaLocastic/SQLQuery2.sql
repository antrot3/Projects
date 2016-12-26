SELECT * FROM TablicaHitova
INNER JOIN Prijenosica
ON Prijenosica.Id = TablicaHitova.Id
INNER JOIN Playlista
ON Playlista.Idplaylista = Prijenosica.PrijenosnicaId
where Playlista.Idplaylista=1
package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/joho/godotenv"
	 "github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
)


var db *gorm.DB

type Mahasiswa struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	NIM  string `json:"nim"`
	Name string `json:"name"`
}

func setupDatabase() {
	var err error
	err = godotenv.Load() // Memuat file .env
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DB_USER") + ":" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT") + ")/" + os.Getenv("DB_NAME") + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect to database")
	}

	db.AutoMigrate(&Mahasiswa{}) // Otomatis migrasi model ke tabel
}
func main() {
	setupDatabase()

	app := fiber.New()
	app.Use(cors.New())

	app.Get("/mahasiswa", getMahasiswa)
	app.Post("/mahasiswa", createMahasiswa)
	app.Put("/mahasiswa/:id", updateMahasiswa)
	app.Delete("/mahasiswa/:id", deleteMahasiswa)

	log.Fatal(app.Listen(":8080")) // Jalankan server di port 8080
}

func getMahasiswa(c *fiber.Ctx) error {
	var mahasiswa []Mahasiswa
	if err := db.Find(&mahasiswa).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(mahasiswa)
}

func createMahasiswa(c *fiber.Ctx) error {
	var mahasiswa Mahasiswa
	if err := c.BodyParser(&mahasiswa); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	db.Create(&mahasiswa)
	return c.Status(201).JSON(mahasiswa)
}

func updateMahasiswa(c *fiber.Ctx) error {
	var mahasiswa Mahasiswa
	id := c.Params("id")

	if err := db.First(&mahasiswa, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Mahasiswa not found"})
	}

	if err := c.BodyParser(&mahasiswa); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	db.Save(&mahasiswa)
	return c.JSON(mahasiswa)
}

func deleteMahasiswa(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := db.Delete(&Mahasiswa{}, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Mahasiswa not found"})
	}
	return c.JSON(fiber.Map{"message": "Mahasiswa berhasil dihapus"})
}

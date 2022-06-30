# this is to run an available mongodb replica set for high-throughput. hasn't been tested yet.
job "mongo" {
  datacenters = ["dc1"]
  type        = "service"
  group "database" {
    count = 3
    network {
      port "db" {
        to = 27017
      }
    }
    service {
      provider = "nomad"
      name     = "mongo-db"
      tags     = ["global", "database"]
      port     = "db"
      restart {
        # The number of attempts to run the job within the specified interval.
        attempts = 2
        interval = "30m"
        delay    = "15s"
        mode     = "fail"
      }
      task "mongo" {
        driver = "docker"
        config {
          image = "mongo:latest"
          ports = ["db"]
        }
        resources {
          cpu    = 500 # 500 MHz
          memory = 512 # 512MB
        }

      }
    }
  }
}

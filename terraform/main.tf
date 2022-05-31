
data "template_file" "docker-node" {
  // installs docker on ubuntu (and nodejs)
  template = file("./nomad.yaml")
}

resource "digitalocean_project" "companies-stream" {
  name        = "companies-creech"
  description = "Companies House API drop-in replacement."
  environment = "Production"
  resources   = [
    digitalocean_droplet.nomad-server.urn
  ]
}
resource "digitalocean_vpc" "services" {
  name        = "services"
  description = "Private networking for service to service communication"
  region      = "lon1"
}
resource "digitalocean_droplet" "nomad-server" {
  image    = "ubuntu-20-04-x64"
  name     = "nomad-server"
  region   = "lon1"
  size     = "s-1vcpu-1gb"
  ssh_keys = [
    data.digitalocean_ssh_key.terraform.id
  ]
  user_data  = data.template_file.docker-node.rendered
  tags       = ["terraform", "nomad"]
  monitoring = true
  vpc_uuid   = digitalocean_vpc.services.id
}
resource "digitalocean_firewall" "only-ssh" {
  name = "only-ssh"
  droplet_ids = [digitalocean_droplet.nomad-server.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "4646"
    source_addresses = ["0.0.0.0/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

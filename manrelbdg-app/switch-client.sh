#!/bin/bash

# MANRELBDG Client Configuration Switcher
# This script helps switch between different client configurations

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Available client configurations
CLIENTS=("MANRELBDG" "MANRELSBY" "PARTAIJKV")

# Function to display usage
show_usage() {
    echo -e "${BLUE}MANRELBDG Client Configuration Switcher${NC}"
    echo ""
    echo "Usage: $0 [CLIENT_NAME]"
    echo ""
    echo "Available clients:"
    for client in "${CLIENTS[@]}"; do
        echo "  - $client"
    done
    echo ""
    echo "Example: $0 bandung"
    echo ""
}

# Function to switch client configuration
switch_client() {
    local client_name=$1
    local config_file="src/config/client.config.ts"
    
    # Check if client is valid
    if [[ ! " ${CLIENTS[@]} " =~ " ${client_name} " ]]; then
        echo -e "${RED}Error: Invalid client name '${client_name}'${NC}"
        echo -e "${YELLOW}Available clients: ${CLIENTS[*]}${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Switching to client: ${client_name}${NC}"
    
    # Update the export line in client.config.ts
    case $client_name in
        "MANRELBDG")
            sed -i '' "s/export const CLIENT_CONFIG = .*/export const CLIENT_CONFIG = MANRELBDG_CONFIG/" "$config_file"
            echo -e "${GREEN}✓ Switched to MANRELBDG (Bandung) configuration${NC}"
            ;;
        "MANRELSBY")
            sed -i '' "s/export const CLIENT_CONFIG = .*/export const CLIENT_CONFIG = MANRELSBY_CONFIG/" "$config_file"
            echo -e "${GREEN}✓ Switched to MANRELSBY (Surabaya) configuration${NC}"
            ;;
        "PARTAIJKV")
            sed -i '' "s/export const CLIENT_CONFIG = .*/export const CLIENT_CONFIG = PARTAIJKV_CONFIG/" "$config_file"
            echo -e "${GREEN}✓ Switched to PARTAIJKV (Jakarta) configuration${NC}"
            ;;
    esac
    
    echo ""
    echo -e "${YELLOW}Configuration Summary:${NC}"
    
    # Display current configuration info
    case $client_name in
        "MANRELBDG")
            echo "  App Name: MANRELBDG"
            echo "  Primary Color: #1890ff (Blue)"
            echo "  Region: Bandung, Jawa Barat"
            echo "  Terminology: Relawan, Koordinator, Dapil"
            ;;
        "MANRELSBY")
            echo "  App Name: MANRELSBY"
            echo "  Primary Color: #52c41a (Green)"
            echo "  Region: Surabaya, Jawa Timur"
            echo "  Terminology: Anggota, Koordinator, Dapil"
            ;;
        "PARTAIJKV")
            echo "  App Name: PARTAIJKV"
            echo "  Primary Color: #722ed1 (Purple)"
            echo "  Region: Jakarta, DKI Jakarta"
            echo "  Terminology: Anggota, Koordinator, Wilayah"
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}✓ Client configuration updated successfully!${NC}"
    echo -e "${YELLOW}Please restart your development server to see changes.${NC}"
}

# Function to show current configuration
show_current() {
    local config_file="src/config/client.config.ts"
    
    if [[ ! -f "$config_file" ]]; then
        echo -e "${RED}Error: Configuration file not found${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Current Client Configuration:${NC}"
    
    local current_config=$(grep "^export const CLIENT_CONFIG =" "$config_file" | sed 's/.*= //' | sed 's/;.*//' | xargs)
    
    case $current_config in
        "MANRELBDG_CONFIG")
            echo -e "${GREEN}  Active: MANRELBDG (Bandung)${NC}"
            ;;
        "MANRELSBY_CONFIG")
            echo -e "${GREEN}  Active: MANRELSBY (Surabaya)${NC}"
            ;;
        "PARTAIJKV_CONFIG")
            echo -e "${GREEN}  Active: PARTAIJKV (Jakarta)${NC}"
            ;;
        *)
            echo -e "${YELLOW}  Active: Custom Configuration (${current_config})${NC}"
            ;;
    esac
}

# Function to create new client configuration
create_client() {
    local client_name=$1
    
    if [[ -z "$client_name" ]]; then
        echo -e "${RED}Error: Please provide a client name${NC}"
        echo "Example: $0 create surabaya"
        exit 1
    fi
    
    echo -e "${BLUE}Creating new client configuration: ${client_name}${NC}"
    
    # Create template for new client
    cat >> "src/config/client.config.ts" << EOF

// ${client_name^} Client Configuration
export const ${client_name}ClientConfig: ClientConfig = {
  ...defaultClientConfig,
  
  client: {
    name: "Manajemen Relawan ${client_name^}",
    code: "${client_name^^}",
    region: "${client_name^}",
    version: "1.0.0",
    environment: "development"
  },
  
  branding: {
    ...defaultClientConfig.branding,
    appName: "MANREL ${client_name^^}",
    appNameShort: "MR${client_name:0:1}",
    appTagline: "Sistem Manajemen Relawan",
    appInitial: "${client_name:0:1}",
    colors: {
      ...defaultClientConfig.branding.colors,
      // Customize colors here
      primary: "#1890ff",
      primaryHover: "#40a9ff",
      secondary: "#722ed1"
    }
  },
  
  regional: {
    ...defaultClientConfig.regional,
    regions: {
      city: "${client_name^}",
      province: "Province Name",
      country: "Indonesia"
    }
  }
}
EOF

    echo -e "${GREEN}✓ New client configuration created for: ${client_name}${NC}"
    echo -e "${YELLOW}Please edit the configuration in src/config/client.config.ts${NC}"
    echo -e "${YELLOW}Then add '${client_name}' to the CLIENTS array in this script${NC}"
}

# Main script logic
case "${1:-}" in
    "")
        show_usage
        show_current
        ;;
    "--help" | "-h")
        show_usage
        ;;
    "--current" | "-c")
        show_current
        ;;
    "create")
        create_client "$2"
        ;;
    *)
        switch_client "$1"
        ;;
esac

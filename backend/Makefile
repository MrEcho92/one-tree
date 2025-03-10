# Makefile

# Python settings
PYTHON := python3
VENV_DIR := .venv
VENV_BIN := $(VENV_DIR)/bin

# Project settings
SRC_DIRS := app tests

# Commands
UVICORN := $(VENV_BIN)/uvicorn
PYTEST := $(VENV_BIN)/pytest
BLACK := $(VENV_BIN)/black
ISORT := $(VENV_BIN)/isort
FLAKE8 := $(VENV_BIN)/flake8

.PHONY: help
help:
	@echo "Usage: make <command>"
	@echo ""
	@echo "Commands:"
	@echo "  install          Install dependencies from requirements.txt"
	@echo "  lint             Run linters (isort and black)"
	@echo "  format           Auto-format code with isort and black"
	@echo "  clean            Remove Python cache files"
	@echo "  test             Run unit tests with pytest"
	@echo "  help             Display this help message"
	@echo "  venv             Activate virtual environment"
	@echo "  run         	  Run FastAPI development server"

.PHONY: venv
venv: ## Create virtual environment
	test -d $(VENV_DIR) || $(PYTHON) -m venv $(VENV_DIR)
	$(VENV_BIN)/pip install --upgrade pip
	$(VENV_BIN)/pip install -r requirements.txt

.PHONY: clean
clean: ## Remove Python and build artifacts
	rm -rf $(VENV_DIR)
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type f -name ".coverage" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	find . -type d -name "*.egg" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type d -name ".mypy_cache" -exec rm -rf {} +
	find . -type d -name ".tox" -exec rm -rf {} +
	find . -type d -name "build" -exec rm -rf {} +
	find . -type d -name "dist" -exec rm -rf {} +
	

.PHONY: format
format: ## Format code using isort and black
	$(ISORT) $(SRC_DIRS)
	$(BLACK) $(SRC_DIRS)

.PHONY: lint
lint: ## Check code style with flake8, isort and black
	$(FLAKE8) $(SRC_DIRS)
	$(ISORT) --check-only --diff $(SRC_DIRS)
	$(BLACK) --check --diff $(SRC_DIRS)

.PHONY: test
test: ## Run tests with pytest
	$(PYTEST) -v --cov=$(SRC_DIRS) --cov-report=term-missing

.PHONY: run
run: ## Run FastAPI development server
	$(UVICORN) app.main:app --host 0.0.0.0 --port 8000 --reload

.PHONY: install
install: venv ## Install project dependencies

.PHONY: check-updates
check-updates: ## Check for package updates
	$(VENV_BIN)/pip list --outdated

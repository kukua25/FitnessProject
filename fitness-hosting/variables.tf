variable "aws_region" {
  description = "AWS region to deploy the stack into"
  type        = string
  default     = "us-east-1"
}

variable "site_name" {
  description = "Base name for the S3 static‑site bucket (a random suffix is appended for global uniqueness)"
  type        = string
  default     = "fitness-simplified"
}

variable "index_file" {
  description = "The website index document."
  type        = string
  default     = "index.html"
}

variable "error_file" {
  description = "Document shown on 4xx/5xx errors (use the SPA index for client‑side routing)."
  type        = string
  default     = "index.html"
}

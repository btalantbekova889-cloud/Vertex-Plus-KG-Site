using System.ComponentModel.DataAnnotations;

namespace VertexPlusApi.Models;

/// <summary>A contact-form submission from the Vertex Plus KG website.</summary>
public class Lead
{
    public int Id { get; set; }

    [Required, MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Material { get; set; }

    [MaxLength(2000)]
    public string? Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

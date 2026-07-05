using System.ComponentModel.DataAnnotations;

namespace VertexPlusApi.Models;

/// <summary>Payload accepted from the public contact form.</summary>
public class LeadCreateRequest
{
    [Required, MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Material { get; set; }

    [MaxLength(2000)]
    public string? Comment { get; set; }
}

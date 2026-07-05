using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VertexPlusApi.Data;
using VertexPlusApi.Models;

namespace VertexPlusApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<LeadsController> _logger;

    public LeadsController(AppDbContext db, ILogger<LeadsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>Submit a lead from the public contact form.</summary>
    [HttpPost]
    public async Task<ActionResult<Lead>> Create(LeadCreateRequest request)
    {
        var lead = new Lead
        {
            Name = request.Name.Trim(),
            Phone = request.Phone.Trim(),
            Material = request.Material?.Trim(),
            Comment = request.Comment?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _db.Leads.Add(lead);
        await _db.SaveChangesAsync();

        _logger.LogInformation("New lead #{Id} from {Name} ({Phone})", lead.Id, lead.Name, lead.Phone);

        return CreatedAtAction(nameof(GetById), new { id = lead.Id }, lead);
    }

    /// <summary>List submitted leads, most recent first. Intended for internal/admin use.</summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lead>>> GetAll()
    {
        var leads = await _db.Leads.OrderByDescending(l => l.CreatedAt).ToListAsync();
        return Ok(leads);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Lead>> GetById(int id)
    {
        var lead = await _db.Leads.FindAsync(id);
        return lead is null ? NotFound() : Ok(lead);
    }
}

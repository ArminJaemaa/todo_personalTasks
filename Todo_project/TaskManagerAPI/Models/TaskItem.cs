using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsComplete { get; set; } = false;

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}

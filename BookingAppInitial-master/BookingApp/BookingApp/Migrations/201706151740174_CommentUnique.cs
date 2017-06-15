namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CommentUnique : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Comments", new[] { "UserId" });
            CreateIndex("dbo.Comments", "UserId", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Comments", new[] { "UserId" });
            CreateIndex("dbo.Comments", "UserId");
        }
    }
}
